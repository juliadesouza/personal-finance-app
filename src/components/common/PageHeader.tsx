type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      <h1 className="text-2xl font-bold tracking-wide mb-0.5">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
