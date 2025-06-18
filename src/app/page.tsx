import { BiodataForm } from '@/components/biodata-form';

export default function HomePage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-2 text-primary">
        Create Your Marriage Biodata
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Fill in the details below to generate a beautiful and professional biodata.
      </p>
      <BiodataForm />
    </div>
  );
}
