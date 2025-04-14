// components/ad-placeholder.jsx
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AdPlaceholder({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 text-center">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close ad"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Ad content */}
        <div className="mb-4">
          <img
            src="/placeholder.svg?height=200&width=300"
            alt="Advertisement"
            className="w-full h-32 sm:h-48 object-cover rounded-md"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Ad Here</h3>
        <p className="text-sm text-gray-600 mb-4">
          This is a placeholder ad. Continue exploring properties!
        </p>
        <Button
          onClick={onClose}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}