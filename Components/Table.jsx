import { Table } from "@nextui-org/react";

export default function App() {
  const columns = [
    // {
    //   key: "name",
    //   label: "NAME",
    // },
    {
      key: "role",
      label: "Message",
    },
    {
      key: "status",
      label: "STATUS",
    },
  ];
  const rows = [
    {
      key: "3",

      role: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",

      role: "Community Manager",
      status: "Vacation",
    },
  ];
  return (
    <Table
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          // <Table.Row key={item.key}>
          //   {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
          // </Table.Row>
          <li>{item}</li>
        )}
      </Table.Body>
    </Table>
  );
}
