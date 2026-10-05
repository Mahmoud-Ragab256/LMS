import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import API from "../config/axiosConfig";
import type { ITeacherRes } from "../interfaces";
import TopBar from "../components/profile/Topbar";
import About from "../components/profile/About";

function Teacher() {

  const { id } = useParams<{ id: string }>();

  const { data: teacher, isLoading, error } = useQuery<ITeacherRes>({
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
      <TopBar teacher={teacher} />
      <About teacher={teacher} />
    </>
  )
}

export default Teacher