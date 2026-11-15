"use client";

import { api } from "@packages/recipes-backend/convex/_generated/api";
import type { Id } from "@packages/recipes-backend/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { formatTag } from "./formatTag";
import { RecipeContainer } from "./RecipeContainer";
import { RecipeFormSkeleton } from "./RecipeSkeletons";
import {
  recipeBtnGhost,
  recipeBtnPrimary,
  recipeBtnSecondary,
  recipeChip,
  recipeField,
  recipeLabel,
  recipeTextarea,
} from "./recipeUi";

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
  const [initialized, setInitialized] = useState(!isEditing);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const createRecipe = useMutation(api.recipes.createRecipe);
  const updateRecipe = useMutation(api.recipes.updateRecipe);
  const generateUploadUrl = useMutation(api.recipes.generateUploadUrl);

  useEffect(() => {
    if (isEditing && existingRecipe && !initialized) {
      setTitle(existingRecipe.title);
      setContent(existingRecipe.content);
      setIngredients(existingRecipe.ingredients || "");
      setTags(existingRecipe.tags);
      setExternalUrl(existingRecipe.externalUrl || "");
      setImagePreview(existingRecipe.imageUrl);
      setIsPublic(existingRecipe.isPublic);
      setInitialized(true);
    }
  }, [isEditing, existingRecipe, initialized]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreview(ev.target?.result as string);
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
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

      if (selectedImage) {
        imageId = await uploadImage();
      } else if (isEditing && existingRecipe?.imageId) {
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
        toast.success("Recipe updated");
      } else {
        await createRecipe(recipeData);
        toast.success("Recipe created");
      }

      onSuccess();
    } catch {
      toast.error(
        isEditing ? "Failed to update recipe" : "Failed to create recipe"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && (existingRecipe === undefined || !initialized)) {
    return <RecipeFormSkeleton />;
  }

  return (
    <RecipeContainer size="reading" className="py-6 sm:py-8 pb-16">
      <div className="recipes-card rounded-xl p-5 sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {isEditing ? "Edit recipe" : "Add recipe"}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className={`${recipeBtnGhost} size-9 p-0`}
            aria-label="Close"
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className={recipeLabel}>
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={recipeField}
              placeholder="e.g. Avocado toast with egg"
              required
            />
          </div>

          <div>
            <span className={recipeLabel}>Image</span>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Recipe preview"
                    className="size-28 rounded-lg border border-border object-cover"
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
                    className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-sm hover:bg-destructive/90 transition-colors"
                    aria-label="Remove image"
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
                className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-lg file:border-0 file:bg-primary/12 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20 transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="content" className={recipeLabel}>
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className={recipeTextarea}
              placeholder="Notes or instructions..."
              required
            />
          </div>

          <div>
            <label htmlFor="ingredients" className={recipeLabel}>
              Ingredients
              <span className="ml-1 font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={3}
              className={recipeTextarea}
              placeholder="List ingredients..."
            />
          </div>

          <div>
            <span className={recipeLabel}>Tags</span>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`flex-1 ${recipeField}`}
                  placeholder="e.g. breakfast, quick"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className={recipeBtnSecondary}
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span key={tag} className={recipeChip}>
                      {formatTag(tag)}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-primary/70 transition-colors"
                        aria-label={`Remove ${formatTag(tag)}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="externalUrl" className={recipeLabel}>
              External link
              <span className="ml-1 font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <input
              type="url"
              id="externalUrl"
              value={externalUrl}
              onChange={(e) => setExternalUrl(e.target.value)}
              className={recipeField}
              placeholder="https://..."
            />
          </div>

          <div>
            <span className={recipeLabel}>Visibility</span>
            <div className="flex gap-2">
              {(
                [
                  { value: true, label: "Public" },
                  { value: false, label: "Private" },
                ] as const
              ).map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => setIsPublic(option.value)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isPublic === option.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 ${recipeBtnPrimary}`}
            >
              {isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Update recipe"
                  : "Create recipe"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={recipeBtnSecondary}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </RecipeContainer>
  );
}
