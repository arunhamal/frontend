import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch } from "../../utils/HTTPUtils";
import { Descriptions, Image } from "antd";
import moment from "moment";

const EventRegisterDetail = ({ navigate }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    if (id) {
      fetch(`/event/register/${id}`).then((res) => {
        if (res?.status === 200) {
          setData(res?.data?.res?.[0]);
        }
      });
    }
  }, [id]);
  return (
    <Descriptions title="Registered Event Detail">
      <Descriptions.Item label={<strong>Event Name</strong>}>
        {data?.event_name}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Futsal Name</strong>}>
        {data?.futsal_name}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Start Date</strong>}>
        {moment(data?.start_date).format("YYYY-MM-DD")}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>End Date</strong>}>
        {moment(data?.end_date).format("YYYY-MM-DD")}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Email</strong>}>
        {data?.email}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Phone</strong>}>
        {data?.phone_number}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Player 1</strong>}>
        {data?.player1}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 1</strong>}>
        <Image
          width={50}
          src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile1}`}
        />
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 2</strong>}>
        {data?.player2}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 2</strong>}>
        <Image
          width={50}
          src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile2}`}
        />
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 3</strong>}>
        {data?.player3}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 3</strong>}>
        <Image
          width={50}
          src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile3}`}
        />
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 4</strong>}>
        {data?.player4}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 4</strong>}>
        <Image
          width={50}
          src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile4}`}
        />
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 5</strong>}>
        {data?.player5}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 5</strong>}>
        <Image
          width={50}
          src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile5}`}
        />
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 6</strong>}>
        {data?.player6 || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 6</strong>}>
        {data?.profile6 ? (
          <Image
            width={50}
            src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile6}`}
          />
        ) : (
          "-"
        )}
      </Descriptions.Item>

      <Descriptions.Item label={<strong>Player 7</strong>}>
        {data?.player7 || "-"}
      </Descriptions.Item>
      <Descriptions.Item label={<strong>Profile 7</strong>}>
        {data?.profile7 ? (
          <Image
            width={50}
            src={`https://thefutsalpro-backend.onrender.com/images/${data?.profile7}`}
          />
        ) : (
          "-"
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default EventRegisterDetail;
