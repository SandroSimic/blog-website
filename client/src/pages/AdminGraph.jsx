import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useBlogContext } from '../context/BlogContext'
import { useUserContext } from '../context/UserContext'



const AdminGraph = () => {

  const { users } = useUserContext()
  const { blogData } = useBlogContext()

  const extractDataByYear = (data, dateField) => {
    return data.reduce((acc, item) => {
      const year = new Date(item[dateField]).getFullYear().toString();
      if (year >= '2021') {
        acc[year] = (acc[year] || { year, users: 0, blogs: 0 });
        if (item.role) {
          acc[year].users += 1;
        } else {
          acc[year].blogs += 1;
        }
      }
      return acc;
    }, {});
  };

  const userDataByYear = extractDataByYear(users, 'createdAt');
  const blogDataByYear = extractDataByYear(blogData, 'createdAt');

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2020 },
    (_, index) => (2021 + index).toString()
  );

  const data = years.map((year) => ({
    year,
    users: userDataByYear[year]?.users || 0,
    blogs: blogDataByYear[year]?.blogs || 0,
  }));



  return (
    <div style={{  display: "flex", alignItems: "center", justifyContent: "center" }}>
      <LineChart width={700} height={300} data={data}>
        <CartesianGrid stroke='#ccc' />
        <XAxis dataKey='year' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='users' stroke='#2195f3' strokeWidth={3} />
        <Line type='monotone' dataKey='blogs' stroke='#F44236' strokeWidth={3} />
      </LineChart>
    </div>
  )
}
export default AdminGraph