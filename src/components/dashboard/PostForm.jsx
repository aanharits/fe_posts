import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { articleSchema } from "@/lib/schema/articleSchema";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export function PostForm({ open, onOpenChange, onSubmit, initialData = null }) {
    const isEditing = !!initialData;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: "",
            author_name: "",
            content: "",
            published: false,
        },
    });

    const publishedValue = watch("published");

    // Update form ketika initialData berubah (saat edit)
    useEffect(() => {
        if (initialData && open) {
            setValue("title", initialData.title || "");
            setValue("author_name", initialData.author_name || "");
            setValue("content", initialData.content || "");
            setValue("published", initialData.published || false);
        } else if (!open) {
            // Reset form ketika modal ditutup
            reset({
                title: "",
                author_name: "",
                content: "",
                published: false,
            });
        }
    }, [initialData, open, setValue, reset]);

    const handleFormSubmit = async (data) => {
        const success = await onSubmit(data);
        if (success) {
            reset();
        }
    };

    const handleCancel = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="px-5 sm:px-6 bg-accent-foreground border-4 border-gray-700 rounded-xl text-gray-700 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg md:text-xl font-bold text-center mb-2">
                        {isEditing ? "Edit Post" : "Create Anything"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="space-y-3 sm:space-y-4"
                >
                    <div>
                        <Input
                            {...register("title")}
                            placeholder="Title"
                            className="w-full px-3 py-2 border text-black border-gray-800 bg-white rounded-lg text-sm sm:text-base"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Input
                            {...register("author_name")}
                            placeholder="Author (optional)"
                            className="w-full px-3 py-2 border text-black border-gray-800 bg-white rounded-lg text-sm sm:text-base"
                        />
                    </div>

                    <div>
                        <Textarea
                            {...register("content")}
                            placeholder="Content"
                            className="w-full min-h-32 max-h-96 resize-y px-3 py-2 border text-black border-gray-800 bg-white rounded-lg text-sm sm:text-base whitespace-pre-wrap break-words"
                        />
                        {errors.content && (
                            <p className="text-red-500 text-xs sm:text-sm mt-1">
                                {errors.content.message}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            className="border border-[#1A1F36]"
                            id="published"
                            checked={publishedValue}
                            onCheckedChange={(checked) =>
                                setValue("published", Boolean(checked))
                            }
                        />
                        <label
                            htmlFor="published"
                            className="text-xs sm:text-sm font-medium"
                        >
                            Published?
                        </label>
                    </div>

                    <DialogFooter className="flex justify-end space-x-2 pt-2">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="bg-white text-black hover:bg-gray-200 text-xs sm:text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gray-900 text-white hover:bg-gray-600 text-xs sm:text-sm"
                        >
                            {isEditing ? "Update" : "Submit"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}