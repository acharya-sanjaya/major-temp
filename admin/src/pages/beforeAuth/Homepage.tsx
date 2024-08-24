const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <Description />
      <KeyFeatures />
      <Footer />
    </div>
  );
};

import {ReactNode} from "react";
import TypingText from "../../components/ui/TypingText";
import Button from "../../components/ui/Button";
import {Book, Personalized, Reservations, Star} from "../../assets/Icons";
import {cn} from "../../utils/cn";
import {useNavigate} from "react-router-dom";

const Description = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 w-full flex gap-4 py-4">
      <div className="relative w-1/2 flex flex-col gap-4">
        <TypingText
          className=" w-full text-4xl font-bold"
          text="Discover, Learn and Elevate."
          delay={50}
        />
        <div className="text-xl">
          Wise Library is your gateway to endless knowledge and inspiration. Dive into a vast
          collection of books, curated to enlighten and empower every reader. Whether you're here to
          learn, escape, or explore, Wise Library offers a personalized experience.
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={() => navigate("/login")}
            label="Get Started"
            variant="success"
            className="rounded-full px-6 capitalize bg-green-600 hover:bg-green-500"
          />
          <Button
            onClick={() => navigate("/register")}
            label="Join Us"
            variant="success"
            className="rounded-full px-6 capitalize bg-transparent text-green-600 border-2 border-green-600 hover:text-white hover:bg-green-600 hover:border-green-200"
          />
        </div>
        <div className="flex w-full justify-between absolute bottom-10">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-700">5k+</div>
            <div className="text-md lowercase">Books available</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-700">10k+</div>
            <div className="text-md lowercase">Monthly reservations</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-700">95%</div>
            <div className="text-md lowercase">User Satisfaction</div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src={`http://localhost:4000/uploads/assets/lib-desc.jpg`}
          alt="Wise Library"
          className="w-full h-full max-h-[70vh]"
        />
      </div>
    </div>
  );
};

const KeyFeatures = () => {
  return (
    <div className="flex flex-col gap-4 p-4 w-full my-32 items-center">
      <div className="text-3xl font-bold">Explore Key Features</div>
      <div className="w-96 text-center mb-8 text-lg">
        Our system is designed to enhance your library experience, offering key features that cater
        to your reading needs.
      </div>
      <div className="flex w-full bg-lime-900">
        <Feature
          icon={<Book className="size-12" />}
          title="Vast Book Collection"
          description="Explore a wide range of books across different genres."
          className="bg-teal-950"
        />
        <Feature
          icon={<Personalized className="size-12" />}
          title="Personalized Recommendations"
          description="Get book suggestions tailored to your preferences."
          className="bg-lime-950"
        />
        <Feature
          icon={<Reservations className="size-12" />}
          title="User-Friendly Reservations"
          description="Easily reserve and manage your reading list."
          className="bg-teal-950"
        />
        <Feature
          icon={<Star className="size-12" />}
          title="Ratings & Reviews"
          description="Rate and review books to share your thoughts."
          className="bg-lime-950"
        />
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  className: string;
}
const Feature = ({icon, title, description, className}: FeatureProps) => (
  <div
    className={cn("flex flex-col items-center justify-center p-6 w-1/4 text-white h-96", className)}
  >
    <div className="text-5xl mb-4">{icon}</div>
    <div className="text-xl font-semibold mb-2">{title}</div>
    <div className="text-center">{description}</div>
  </div>
);

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl bg-emerald-950 mx-4 my-20 flex text-white">
      <div className="p-8 w-2/3">
        <div className="text-3xl w-2/3 mb-8">Start Your Journey with Wise Library!</div>
        <div className="text-lg w-2/3 mb-12 max-w-[40rem]">
          Discover the future of Online Library Management. Sign up now for an enhanced reading
          experience.
        </div>
        <div className="flex gap-10">
          <Button
            onClick={() => navigate("/login")}
            label="Login"
            variant="success"
            className="rounded-full px-6 capitalize bg-transparent text-green-600 border-2 border-green-600 hover:text-white hover:bg-green-600 hover:border-green-200"
          />
          <Button
            onClick={() => navigate("/register")}
            label="Sign Up"
            variant="success"
            className="rounded-full px-6 capitalize bg-transparent text-green-600 border-2 border-green-600 hover:text-white hover:bg-green-600 hover:border-green-200"
          />
        </div>
      </div>
      <div className="w-1/3 relative">
        <img
          src={`http://localhost:4000/uploads/assets/lib-desc-2.jpg`}
          alt="Wise Library"
          className="absolute w-2/3 h-[110%] -top-[25%]"
        />
      </div>
    </div>
  );
};

export default Homepage;
