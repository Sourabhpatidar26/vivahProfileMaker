import type { Biodata } from '@/lib/schemas';
import { format } from 'date-fns';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-serif font-semibold text-center my-6 pb-2 border-b-2 border-amber-800 text-amber-900 tracking-wider">
      {children}
    </h2>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <tr className="border-b border-amber-200/50">
      <td className="py-2 pr-4 font-semibold text-amber-900 align-top w-1/3">{label}</td>
      <td className="py-2 text-gray-700 w-2/3">{value}</td>
    </tr>
  );
}

export function Template2({ biodata }: { biodata: Biodata }) {
  const { personalDetails, familyDetails, jobDetails, propertyDetails } = biodata;
  
  const formatAddress = (address: any) => {
    if (!address || !address.street) return 'N/A';
    return `${address.street}, ${address.city}, ${address.state} - ${address.zip}, ${address.country}`;
  };
  
  return (
    <div className="p-10 bg-orange-50 font-serif text-gray-800 border-4 border-amber-700">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold text-amber-900 tracking-wide">{personalDetails.name}</h1>
        <p className="text-xl text-amber-800 mt-2">Biodata for Matrimony</p>
      </header>
      
      <div className="w-full h-px bg-amber-600 my-4"></div>

      <main>
        <SectionTitle>Personal Information</SectionTitle>
        <table className="w-full text-sm">
          <tbody>
            <DetailRow label="Date of Birth" value={personalDetails.dob ? format(personalDetails.dob, 'MMMM d, yyyy') : 'N/A'} />
            <DetailRow label="Time of Birth" value={personalDetails.tob} />
            <DetailRow label="Place of Birth" value={personalDetails.pob} />
            <DetailRow label="Age" value={`${personalDetails.age} years`} />
            <DetailRow label="Contact No." value={personalDetails.phone} />
            <DetailRow label="Email ID" value={personalDetails.email} />
            <DetailRow label="Current Address" value={formatAddress(personalDetails.currentAddress)} />
            <DetailRow label="Permanent Address" value={personalDetails.sameAsCurrentAddress ? 'Same as Current Address' : formatAddress(personalDetails.permanentAddress)} />
          </tbody>
        </table>

        <SectionTitle>Family Background</SectionTitle>
        <table className="w-full text-sm">
          <tbody>
            <DetailRow label="Father's Name" value={familyDetails.fatherName} />
            <DetailRow label="Father's Occupation" value={familyDetails.fatherOccupation} />
            <DetailRow label="Mother's Name" value={familyDetails.motherName} />
            <DetailRow label="Mother's Occupation" value={familyDetails.motherOccupation} />
            {familyDetails.siblings && familyDetails.siblings.length > 0 && (
                <tr className="border-b border-amber-200/50">
                    <td className="py-2 pr-4 font-semibold text-amber-900 align-top w-1/3">Siblings</td>
                    <td className="py-2 text-gray-700 w-2/3">
                        <ul className="list-none space-y-1">
                            {familyDetails.siblings.map((s, i) => (
                                <li key={i}>{`${s.relation}: ${s.name} (${s.maritalStatus}, Occ: ${s.occupation || 'N/A'})`}</li>
                            ))}
                        </ul>
                    </td>
                </tr>
            )}
            <DetailRow label="Family Values" value={familyDetails.familyValues} />
          </tbody>
        </table>

        {jobDetails && (jobDetails.companyName || jobDetails.designation) && (
          <>
            <SectionTitle>Professional Summary</SectionTitle>
            <table className="w-full text-sm">
              <tbody>
                <DetailRow label="Company" value={jobDetails.companyName} />
                <DetailRow label="Designation" value={jobDetails.designation} />
                <DetailRow label="Annual Income" value={jobDetails.income} />
                <DetailRow label="Work Location" value={jobDetails.location} />
              </tbody>
            </table>
          </>
        )}

        {propertyDetails && propertyDetails.description && (
          <>
            <SectionTitle>Assets</SectionTitle>
             <table className="w-full text-sm">
              <tbody>
                <DetailRow label="Description" value={propertyDetails.description} />
                <DetailRow label="Type" value={propertyDetails.type} />
                <DetailRow label="Value" value={propertyDetails.value} />
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
}
