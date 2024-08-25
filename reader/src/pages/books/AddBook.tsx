import {useState, useEffect} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "../../components/ui/Button";
import {toast} from "react-toastify";
import {cn} from "../../utils/cn";

const schema = z.object({
  title: z.string().min(1, {message: "Fill this field"}),
  ISBN: z.string().min(1, {message: "Fill this field"}),
  genre: z.string().min(1, {message: "Fill this field"}),
  description: z.string().min(1, {message: "Fill this field"}),
  coverImage: z
    .custom(
      (value) => value instanceof FileList && value.length > 0,
      "Enter a cover image for the book"
    )
    .refine(
      // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (files) => files[0].type === "image/jpeg" || files[0].type === "image/png",
      "Please enter a valid image [.jpg, .jpeg, .png]."
    )
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .refine((files) => files[0].size <= 1024 * 1024 * 2, "Max image size is 2MB."),
  bookPdf: z
    .custom((value) => value instanceof FileList && value.length > 0, "Enter the pdf of the book")
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .refine((files) => files[0].type === "application/pdf", "Please enter a valid pdf.")
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    .refine((files) => files[0].size <= 1024 * 1024 * 10, "Max pdf size is 10MB."),
  isPremium: z.boolean(),
});

interface FormValues {
  title: string;
  ISBN: string;
  genre: string;
  description: string;
  coverImage: FileList;
  bookPdf: FileList;
  isPremium: boolean;
}

const AddBook = ({onBookAdded}: {onBookAdded: () => void}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const isPremium = watch("isPremium");
  const activeGenre = watch("genre");
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/genre/getAllGenre");
        const data = await response.json();
        const genreNames = data.genres.map((genre: {name: string; _id: string}) => genre.name);
        setGenres(genreNames || []);
      } catch (error) {
        console.error("Error fetching genres:", error);
        toast.error("Failed to fetch genres.");
      }
    };

    fetchGenres();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("isbn", data.ISBN);
    formData.append("genre", data.genre);
    formData.append("description", data.description);
    formData.append("coverImage", data.coverImage[0]); // Access the first file
    formData.append("pdf", data.bookPdf[0]); // Access the first file
    formData.append("isPremium", JSON.stringify(data.isPremium));

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:4000/api/book/addBook", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("Book added successfully!");
        onBookAdded();
      } else {
        const errorData = await response.json();
        toast.error(`Failed to add book. Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error uploading book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-5">
      <div className="text-center font-bold text-3xl">Add Book</div>
      <FormInputField
        label="Title"
        type="text"
        registerProps={register("title")}
        error={Boolean(errors.title)}
        helperText={errors.title?.message ?? ""}
      />
      <FormInputField
        label="ISBN"
        type="text"
        registerProps={register("ISBN")}
        error={Boolean(errors.ISBN)}
        helperText={errors.ISBN?.message ?? ""}
      />
      <div className="mb-5">
        <label className={errors.genre ? "text-red-600" : "text-secondary-foreground"}>Genre</label>
        <select
          className={cn(
            "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary text-secondary-foreground transition-colors",
            errors.genre ? "border-red-600" : "border-secondary-foreground"
          )}
          {...register("genre")}
        >
          {genres.length > 0 ? (
            genres.map((genre) => (
              <option
                className={cn(
                  activeGenre === genre ? "text-blue-500" : "text-secondary-foreground"
                )}
                key={genre}
                value={genre}
              >
                {genre}
              </option>
            ))
          ) : (
            <option value="">No genres available</option>
          )}
        </select>
        {errors.genre && <p className="mt-1 text-red-600 text-sm">{errors.genre.message}</p>}
      </div>
      <FormInputField
        label="Description"
        type="text"
        registerProps={register("description")}
        error={Boolean(errors.description)}
        helperText={errors.description?.message ?? ""}
      />
      <FormInputField
        label="Cover Image"
        type="file"
        accept="image/jpeg, image/png"
        registerProps={register("coverImage")}
        error={Boolean(errors.coverImage)}
        helperText={errors.coverImage?.message ?? ""}
      />
      <FormInputField
        label="PDF"
        type="file"
        accept="application/pdf"
        registerProps={register("bookPdf")}
        error={Boolean(errors.bookPdf)}
        helperText={errors.bookPdf?.message ?? ""}
      />
      <div className="mb-5 flex gap-5 items-center">
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input {...register("isPremium")} type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 rounded-full transition-colors duration-300 ease-in-out bg-blue-500 peer-checked:bg-yellow-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
          </label>
        </div>
        <label className={isPremium ? "text-yellow-500" : "text-blue-500"}>
          {isPremium ? "Premium" : "Free"}
        </label>
      </div>
      <div className="mt-5">
        <Button
          label={loading ? "Loading..." : "Add Book"}
          type="submit"
          variant={loading ? "muted" : "standard"}
        />
      </div>
    </form>
  );
};

export default AddBook;

const FormInputField = ({
  label,
  type = "text",
  registerProps,
  error,
  helperText,
  accept,
}: {
  registerProps: React.InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
  helperText: string;
  label: string;
  type?: "text" | "number" | "file";
  accept?: string;
}) => (
  <div className="mb-5">
    <label className={error ? "text-red-600" : "text-secondary-foreground"}>{label}</label>
    <input
      className={cn(
        "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 bg-secondary text-secondary-foreground transition-colors",
        error ? "border-red-600" : "border-secondary-foreground"
      )}
      type={type}
      {...registerProps}
      accept={accept}
    />
    {helperText && <p className="mt-1 text-red-600 text-sm">{helperText}</p>}
  </div>
);
