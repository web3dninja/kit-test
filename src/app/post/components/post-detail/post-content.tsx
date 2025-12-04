interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
}

