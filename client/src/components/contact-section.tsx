import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: ""
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.message,
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: ""
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's Work Together</h2>
          <div className="w-24 h-1 gradient-green-yellow mx-auto rounded-full"></div>
          <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
            Ready to take your business to the next level? Let's discuss how we can achieve your goals together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div 
            className={`transition-all duration-800 ${
              isVisible ? 'animate-slideInLeft opacity-100' : 'opacity-0 translate-x-[-50px]'
            }`}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 hover:bg-emerald-500 transition-colors duration-300">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">professional@portfolio.com</p>
                </div>
              </div>

              <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 hover:bg-amber-500 transition-colors duration-300">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center transform hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mr-4 hover:bg-green-600 transition-colors duration-300">
                  <MapPin className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Location</p>
                  <p className="text-gray-600">San Francisco, CA</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Professional team meeting in modern office" 
                className="rounded-xl shadow-lg w-full h-auto transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`bg-gray-50 p-8 rounded-2xl transform hover:shadow-xl transition-all duration-300 ${
              isVisible ? 'animate-slideInRight opacity-100' : 'opacity-0 translate-x-[50px]'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your Name"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Your Company"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="service">Service Interested In *</Label>
                <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategy">Strategy Consulting</SelectItem>
                    <SelectItem value="campaign">Full Campaign Management</SelectItem>
                    <SelectItem value="training">Team Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="mt-2"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full gradient-green-yellow text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
