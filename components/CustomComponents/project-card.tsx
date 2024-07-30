import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  image: string;
}

const ProjectCard = ({
  title,
  description,
  stack,
  image,
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex aspect-square flex-col items-center gap-2 p-6">
        <h1>{title}</h1>
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="rounded-xl"
        />
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          {stack.map((tech, index) => (
            <Badge key={index}>{tech}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
