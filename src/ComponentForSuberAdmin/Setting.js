import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { routes } from "../routes";

function Setting() {
  const [Setting, setSetting] = useState([]);
  const [AllowTrainingRegister, setAllowTrainingRegister] = useState(true);
  const [MaxAllowTrainingToRegister, setMaxAllowTrainingToRegister] =
    useState();
  const [updateStudentLevel, setupdateStudentLevel] = useState(true);
  const [MainSemsterId, setMainSemsterId] = useState("");
  const accessToken = localStorage.getItem("accesstoken");
  const refreshToken = localStorage.getItem("refreshtoken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://university-mohamed.vercel.app${routes.setting._id}${routes.setting.ViewSetting}?page=1&size=5`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }
        );

        console.log(response.data);
        setSetting(response.data);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
  return (
    <>
      <h3>Setting</h3>
    </>
  );
}
export default Setting;
