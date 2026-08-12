import { useEffect, useState } from "react";

import Header from "../components/Header";
import DetailedForm from "../components/DetailedForm";
import RecordTable from "../components/RecordTable";
import StatsCard from "../components/StatsCard";

import API from "../services/api";

function Dashboard() {

  const [records, setRecords] =
    useState([]);

  const loadRecords = async () => {

    const response =
      await API.get("/records");

    setRecords(response.data);

  };

  useEffect(() => {

    loadRecords();

  }, []);

  return (

    <div>

      <Header />

      <div className="stats">

        <StatsCard
          title="Total Records"
          value={records.length}
        />

      </div>

      <DetailedForm
        refresh={loadRecords}
      />

      <RecordTable
        records={records}
      />

    </div>

  );

}

export default Dashboard;
