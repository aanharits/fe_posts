import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

export function PostViewModal({ post, open, onOpenChange }) {
    if (!post) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="px-4 sm:px-6 bg-accent-foreground text-black border-3 border-gray-700 rounded-2xl shadow-xl max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-lg sm:text-2xl font-bold break-words pr-6">
                        {post.title}
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto space-y-2 mt-2 pr-2">
                    <p className="text-gray-600 text-xs sm:text-sm">
                        <span className="font-semibold">Author:</span>{" "}
                        {post.author_name || "Anonymous"}
                    </p>
                    <hr className="border-gray-400" />
                    <p className="whitespace-pre-wrap break-words text-gray-800 text-sm sm:text-base leading-relaxed">
                        {post.content}
                    </p>
                </div>

                <DialogFooter className="mt-4 flex-shrink-0">
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="bg-gray-800 text-white hover:bg-gray-700 text-xs sm:text-sm"
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}