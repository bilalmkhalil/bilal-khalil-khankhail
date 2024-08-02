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
    <Card className="w-full overflow-hidden">
      <CardContent className="relative h-56 w-full">
        <Image
          src={image}
          alt={title}
          fill={true}
          style={{ objectFit: "cover" }}
        />
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 pt-4">
        <h1 className="text-2xl font-bold">{title}</h1>

        <p>{description}</p>
        <div className="flex flex-row flex-wrap gap-2 overflow-hidden">
          {stack.map((tech, index) => (
            <Badge key={index}>{tech}</Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
