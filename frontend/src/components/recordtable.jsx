function RecordTable({ records }) {

  return (

    <table>

      <thead>

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>

      </thead>

      <tbody>

        {records.map(record => (

          <tr key={record.id}>

            <td>{record.id}</td>

            <td>{record.name}</td>

            <td>{record.email}</td>

            <td>{record.phone}</td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}

export default RecordTable;
