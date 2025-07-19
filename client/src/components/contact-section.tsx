import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Loader2, Shield, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  mobile?: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    mobile: ""
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  const requestOtpMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/otp-verification", {
        ...data,
        action: "request-otp"
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "OTP Sent!",
        description: `Verification code sent to ${formData.email}`,
      });
      setShowOtpInput(true);
      setIsOtpSent(true);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const response = await apiRequest("POST", "/api/otp-verification", {
        email,
        otp,
        action: "verify-otp"
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent Successfully!",
        description: data.message,
      });
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        message: "",
        mobile: ""
      });
      setOtp("");
      setShowOtpInput(false);
      setIsOtpSent(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
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

    if (!showOtpInput) {
      // Step 1: Request OTP
      requestOtpMutation.mutate(formData);
    } else {
      // Step 2: Verify OTP and submit
      if (!otp || otp.length !== 6) {
        toast({
          title: "Invalid OTP",
          description: "Please enter the 6-digit verification code.",
          variant: "destructive",
        });
        return;
      }
      verifyOtpMutation.mutate({ email: formData.email, otp });
    }
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
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="e.g. +1 555 123 4567"
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

              {!showOtpInput ? (
                <Button 
                  type="submit" 
                  className="w-full gradient-green-yellow text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  disabled={requestOtpMutation.isPending}
                >
                  {requestOtpMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Send Verification Code
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">Verification Code Sent</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      We've sent a 6-digit verification code to <strong>{formData.email}</strong>. 
                      Please check your email and enter the code below.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="otp">Verification Code *</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      className="mt-2 text-center text-lg font-mono tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-green-yellow text-white py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    disabled={verifyOtpMutation.isPending}
                  >
                    {verifyOtpMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Verify & Send Message
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      setShowOtpInput(false);
                      setIsOtpSent(false);
                      setOtp("");
                    }}
                    className="w-full"
                  >
                    Back to Form
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
