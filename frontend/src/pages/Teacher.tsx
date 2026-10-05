import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import API from "../config/axiosConfig";

function Teacher() {

  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, error } = useQuery({
    queryKey: ['teacher'],
    queryFn: async () => {
      const response = await API.get(`/teachers/${id}`);
      return response.data.data;
    },
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!teacher) {
    return <div>Teacher not found</div>;
  }
  return (
    <>
      <div className='mt-20 flex flex-col items-center justify-center h-screen'>
        <h1 className='text-4xl font-bold mb-4'>Teacher Page</h1>
        <p className='text-lg '>{teacher}</p>
      </div>
    </>
  )
}

export default Teacher