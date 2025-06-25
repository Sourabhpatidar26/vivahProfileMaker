import type { Biodata } from '@/lib/schemas';
import { format } from 'date-fns';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 last:mb-0">
      <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4 text-gray-800">{title}</h2>
      <div className="text-gray-700 space-y-2 text-sm">{children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="grid grid-cols-3 gap-2">
      <p className="font-semibold col-span-1">{label}</p>
      <p className="col-span-2">{value}</p>
    </div>
  );
}

export function Template1({ biodata }: { biodata: Biodata }) {
  const { personalDetails, familyDetails, jobDetails, propertyDetails } = biodata;
  
  const formatAddress = (address: any) => {
    if (!address || !address.street) return 'N/A';
    return `${address.street}, ${address.city}, ${address.state} - ${address.zip}, ${address.country}`;
  };

  return (
    <div className="p-8 bg-white text-gray-800 font-sans">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{personalDetails.name}</h1>
        <p className="text-lg text-gray-500 mt-1">Matrimonial Biodata</p>
      </header>

      <main>
        <Section title="Personal Details">
          <Detail label="Date of Birth" value={personalDetails.dob ? format(personalDetails.dob, 'PPP') : 'N/A'} />
          <Detail label="Time of Birth" value={personalDetails.tob} />
          <Detail label="Place of Birth" value={personalDetails.pob} />
          <Detail label="Age" value={personalDetails.age} />
          <Detail label="Phone" value={personalDetails.phone} />
          <Detail label="Email" value={personalDetails.email} />
          <Detail label="Current Address" value={formatAddress(personalDetails.currentAddress)} />
          <Detail label="Permanent Address" value={personalDetails.sameAsCurrentAddress ? 'Same as Current Address' : formatAddress(personalDetails.permanentAddress)} />
        </Section>

        <Section title="Family Details">
          <Detail label="Father's Name" value={`${familyDetails.fatherName}`} />
          <Detail label="Father's Occupation" value={`${familyDetails.fatherOccupation}`} />
          <Detail label="Mother's Name" value={`${familyDetails.motherName}`} />
          <Detail label="Mother's Occupation" value={`${familyDetails.motherOccupation}`} />
          {familyDetails.siblings && familyDetails.siblings.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              <p className="font-semibold col-span-1">Siblings:</p>
              <div className="col-span-2">
                <ul className="list-disc list-inside">
                  {familyDetails.siblings.map((s, i) => (
                    <li key={i}>{`${s.relation} - ${s.name} (${s.maritalStatus}, ${s.occupation || 'N/A'})`}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <Detail label="Family Values" value={familyDetails.familyValues} />
        </Section>
        
        {jobDetails && (jobDetails.companyName || jobDetails.designation) && (
          <Section title="Professional Details">
            <Detail label="Company" value={jobDetails.companyName} />
            <Detail label="Designation" value={jobDetails.designation} />
            <Detail label="Income" value={jobDetails.income} />
            <Detail label="Location" value={jobDetails.location} />
          </Section>
        )}

        {propertyDetails && propertyDetails.description && (
          <Section title="Property Details">
            <Detail label="Description" value={propertyDetails.description} />
            <Detail label="Type" value={propertyDetails.type} />
            <Detail label="Value" value={propertyDetails.value} />
          </Section>
        )}
      </main>
    </div>
  );
}
