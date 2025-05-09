
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Image, Signature, FileText } from "lucide-react";
import { PassportApplication } from "@/lib/types";
import ApplicationStatusBadge from "@/components/ApplicationStatusBadge";
import { generatePassportPDF } from "@/lib/utils";

interface ApplicationDetailsProps {
  application: PassportApplication;
  showActions?: boolean;
  onVerify?: (id: string, type: "police" | "officer") => void;
}

const ApplicationDetails = ({
  application,
  showActions = false,
  onVerify,
}: ApplicationDetailsProps) => {
  return (
    <Card className="w-full shadow-md mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">{application.fullName}</CardTitle>
          <CardDescription>
            Application ID: {application.id.substring(0, 8)}
          </CardDescription>
        </div>
        <ApplicationStatusBadge application={application} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium mb-2">Personal Details</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Father:</span>{" "}
                {application.fatherName}
              </p>
              <p>
                <span className="font-medium">Mother:</span>{" "}
                {application.motherName}
              </p>
              <p>
                <span className="font-medium">DoB:</span> {application.dob}
              </p>
              <p>
                <span className="font-medium">Gender:</span>{" "}
                {application.gender}
              </p>
              <p>
                <span className="font-medium">Marital Status:</span>{" "}
                {application.maritalStatus}
              </p>
              <p>
                <span className="font-medium">Nationality:</span>{" "}
                {application.nationality}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Contact & Address</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Email:</span> {application.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {application.phoneNumber}
              </p>
              <p>
                <span className="font-medium">Current Address:</span>{" "}
                {application.currentAddress}
              </p>
              <p>
                <span className="font-medium">Permanent Address:</span>{" "}
                {application.permanentAddress}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Identification</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Aadhar:</span>{" "}
                {application.aadharNumber}
              </p>
              <p>
                <span className="font-medium">PAN:</span>{" "}
                {application.panNumber}
              </p>
              <p>
                <span className="font-medium">Education:</span>{" "}
                {application.educationalQualification}
              </p>
              <p>
                <span className="font-medium">Police Station:</span>{" "}
                {application.policeStation}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Attachments & Status</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">Photo:</span>{" "}
                {application.photoUrl ? (
                  <div className="mt-2">
                    <img
                      src={application.photoUrl}
                      alt="Applicant Photo"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                    <Button
                      variant="link"
                      onClick={() => window.open(application.photoUrl)}
                      className="mt-1 h-auto p-0"
                    >
                      <Image className="h-4 w-4 mr-1" />
                      View Full Photo
                    </Button>
                  </div>
                ) : (
                  "Not uploaded"
                )}
              </p>
              <p>
                <span className="font-medium">Signature:</span>{" "}
                {application.signatureUrl ? (
                  <div className="mt-2">
                    <img
                      src={application.signatureUrl}
                      alt="Applicant Signature"
                      className="h-16 object-contain rounded-md border bg-white"
                    />
                    <Button
                      variant="link"
                      onClick={() => window.open(application.signatureUrl)}
                      className="mt-1 h-auto p-0"
                    >
                      <Signature className="h-4 w-4 mr-1" />
                      View Full Signature
                    </Button>
                  </div>
                ) : (
                  "Not uploaded"
                )}
              </p>
              
              {/* Added document displays */}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Uploaded Documents</h4>
                <div className="space-y-2">
                  {application.aadharUrl && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <Button
                        variant="link"
                        onClick={() => window.open(application.aadharUrl)}
                        className="h-auto p-0"
                      >
                        View Aadhar Card
                      </Button>
                    </div>
                  )}
                  
                  {application.panUrl && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <Button
                        variant="link"
                        onClick={() => window.open(application.panUrl)}
                        className="h-auto p-0"
                      >
                        View PAN Card
                      </Button>
                    </div>
                  )}
                  
                  {application.educationUrl && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <Button
                        variant="link"
                        onClick={() => window.open(application.educationUrl)}
                        className="h-auto p-0"
                      >
                        View Education Certificate
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <p>
                  <span className="font-medium">Police Verified:</span>{" "}
                  {application.policeVerified ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Officer Verified:</span>{" "}
                  {application.officerVerified ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-4">
        {application.policeVerified && application.officerVerified && (
          <Button
            onClick={() => generatePassportPDF(application)}
            className="flex items-center gap-2"
          >
            <File className="h-4 w-4" />
            Download Passport PDF
          </Button>
        )}

        {showActions && onVerify && (
          <div className="flex space-x-2">
            {!application.policeVerified && (
              <Button
                variant="outline"
                onClick={() => onVerify(application.id, "police")}
              >
                Verify as Police
              </Button>
            )}

            {!application.officerVerified && (
              <Button
                variant="default"
                onClick={() => onVerify(application.id, "officer")}
              >
                Verify as Officer
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationDetails;
