
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const jobOpenings = [
  {
    id: 1,
    title: "Beauty Consultant",
    department: "Sales",
    location: "Delhi, India",
    type: "Full-time",
    description: "We are looking for passionate beauty consultants to join our team. You will provide excellent customer service, offer product recommendations, and help customers achieve their beauty goals."
  },
  {
    id: 2,
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Join our marketing team to help grow our online presence. You'll be responsible for creating engaging content, managing social media channels, and implementing digital marketing campaigns."
  },
  {
    id: 3,
    title: "Inventory Manager",
    department: "Operations",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Help ensure our products are always in stock and ready for shipping. You'll manage inventory levels, coordinate with suppliers, and optimize our warehouse operations."
  },
  {
    id: 4,
    title: "Customer Support Representative",
    department: "Customer Service",
    location: "Bangalore, India",
    type: "Part-time",
    description: "Provide exceptional support to our customers via phone, email, and chat. You'll resolve product inquiries, process returns, and ensure customer satisfaction."
  }
];

export default function CareersPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl mb-4">Join Our Team</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Be part of a passionate team dedicated to bringing the best beauty products to our customers.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="font-serif text-3xl mb-6">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Growth Opportunities</h3>
                <p className="text-gray-600">
                  We believe in nurturing talent. Our team members have numerous opportunities to develop their skills and advance their careers.
                </p>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Inclusive Culture</h3>
                <p className="text-gray-600">
                  We foster a diverse and inclusive workplace where everyone's ideas and perspectives are valued.
                </p>
              </div>
              
              <div className="p-6 bg-primary/5 rounded-lg">
                <h3 className="font-serif text-xl mb-3">Work-Life Balance</h3>
                <p className="text-gray-600">
                  We understand the importance of balancing professional and personal life, and our policies reflect this commitment.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-3xl mb-6">Current Openings</h2>
            <div className="space-y-6">
              {jobOpenings.map(job => (
                <Card key={job.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.department} • {job.location} • {job.type}
                        </CardDescription>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{job.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
