import { Card, Text } from "@nextui-org/react";

export default function PressableCard({ text }) {
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      className="flex justify-center items-center"
      css={{ mw: "500px" }}
    >
      <Card.Body>
        <Text>{text}</Text>
      </Card.Body>
    </Card>
  );
}
