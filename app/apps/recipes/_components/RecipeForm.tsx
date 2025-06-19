"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface RecipeFormProps {
  recipeId?: Id<"recipes">;
  onCancel: () => void;
  onSuccess: () => void;
}

export function RecipeForm({ recipeId, onCancel, onSuccess }: RecipeFormProps) {
  const isEditing = !!recipeId;
  const existingRecipe = useQuery(
    api.recipes.getRecipe,
    recipeId ? { recipeId } : "skip"
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createRecipe = useMutation(api.recipes.createRecipe);
  const updateRecipe = useMutation(api.recipes.updateRecipe);
  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);

  // Initialize form with existing recipe data
  useState(() => {
    if (isEditing && existingRecipe) {
      setTitle(existingRecipe.title);
      setContent(existingRecipe.content);
      setIngredients(existingRecipe.ingredients || "");
      setTags(existingRecipe.tags);
      setExternalUrl(existingRecipe.externalUrl || "");
      setImagePreview(existingRecipe.imageUrl);
      setIsPublic(existingRecipe.isPublic);
    }
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const uploadImage = async (): Promise<Id<"_storage"> | undefined> => {
    if (!selectedImage) return undefined;

    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });

      if (!result.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await result.json();
      return storageId;
    } catch (error) {
      toast.error("Failed to upload image");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a recipe title");
      return;
    }

    if (!content.trim()) {
      toast.error("Please enter recipe content");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageId: Id<"_storage"> | undefined;

      // Upload new image if selected
      if (selectedImage) {
        imageId = await uploadImage();
      } else if (isEditing && existingRecipe?.imageId) {
        // Keep existing image if editing and no new image selected
        imageId = existingRecipe.imageId;
      }

      const recipeData = {
        title: title.trim(),
        content: content.trim(),
        ingredients: ingredients.trim() || undefined,
        tags,
        externalUrl: externalUrl.trim() || undefined,
        imageId,
        isPublic,
      };

      if (isEditing && recipeId) {
        await updateRecipe({ recipeId, ...recipeData });
        toast.success("Recipe updated!");
      } else {
        await createRecipe(recipeData);
        toast.success("Recipe created!");
      }

      onSuccess();
    } catch (error) {
      toast.error(
        isEditing ? "Failed to update recipe" : "Failed to create recipe"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && existingRecipe === undefined) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {isEditing ? "Edit Recipe" : "Add New Recipe"}
          </h2>
          <button
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="e.g., Avocado toast with egg"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Recipe Image
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="w-32 h-32 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Recipe Content *
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-vertical bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="Simple notes or detailed instructions..."
              required
            />
          </div>

          {/* Ingredients (Optional) */}
          <div>
            <label
              htmlFor="ingredients"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Ingredients (Optional)
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-vertical bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="List ingredients here..."
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="e.g., breakfast, quick, healthy"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary/80 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* External URL */}
          <div>
            <label
              htmlFor="externalUrl"
              className="block text-sm font-medium text-foreground mb-2"
            >
              External Recipe Link (Optional)
            </label>
            <input
              type="url"
              id="externalUrl"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="https://example.com/recipe"
            />
          </div>

          {/* Visibility */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center text-foreground">
                <input
                  type="radio"
                  name="visibility"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center text-foreground">
                <input
                  type="radio"
                  name="visibility"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="mr-2"
                />
                Private
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update Recipe"
                  : "Create Recipe"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
