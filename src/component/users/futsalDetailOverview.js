import React, { useEffect, useState } from "react";
import moment from "moment";

const FutsalDetailOverview = ({ futsalDetail }) => {

  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  // useEffect(() => {

  //   const startTimeStamp = new Date(futsalDetail?.start_time || null);
  //   setStartTime(startTimeStamp.toISOString().substr(11, 8))
  
  //   const endTimeStamp = new Date(futsalDetail?.end_time || null);
  //   setEndTime(endTimeStamp.toISOString().substr(11, 8))
  // }, [futsalDetail?.start_time])
  return (
    <div
      className="tab-pane fade show active mb-5"
      id="home"
      role="tabpanel"
      aria-labelledby="overview-tab"
    >
      <h5 className="mt-4">Futsal Details</h5>
      <strong>
        Playing Hours: {moment(futsalDetail?.start_time).format('hh:mm:ss A')} - {moment(futsalDetail?.end_time).format('hh:mm:ss A')}
      </strong>
      <br />
      <strong>Description:</strong>
      <br />
      {futsalDetail?.description}
      {/* <strong>Timing</strong>
      <strong>Rates</strong> */}
    </div>
  );
};

export default FutsalDetailOverview;
