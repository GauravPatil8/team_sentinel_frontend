"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Shield, Upload, ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const searchParams = useSearchParams()
  
  // ✅ Fix Hydration Error: Ensure `role` is only set on the client
  const [role, setRole] = useState<string>("customer");

  useEffect(() => {
    setRole(searchParams.get("role") || "customer");
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // Customer fields
    profilePicture: null,
    phoneNumber: "",
    // Shopkeeper fields
    shopName: "",
    shopAddress: "",
    shopCity: "",
    shopState: "",
    shopZip: "",
    businessHours: "",
    shopPhone: "",
    shopDescription: "",
    termsAccepted: false,
  });

  const { customerSignup, shopkeeperSignup, isLoading, error } = useAuth();

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }));
  };

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("Moving to Step 2"); 
    setStep(2);
  };
  
  const handlePrevStep = () => {
    console.log("Returning to Step 1");
    setStep(1);
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (typeof window === "undefined") {
      console.error(" Prevented execution on server!");
      return;
    }
  
    try {
      if (role === "customer") {
        const name = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
        await customerSignup(name, formData.email, formData.password);
      } else {
        const name = `${formData.firstName} ${formData.lastName}`;
        const address = `${formData.shopAddress}, ${formData.shopCity}, ${formData.shopState} ${formData.shopZip}`;
  
        
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            
            const coordinates: [number, number] = [position.coords.longitude, position.coords.latitude];
  
            
            const location = {
              type: "Point",
              coordinates, 
            };
  
            console.log(" Shopkeeper Location Fetched:", location);
  
            
            await shopkeeperSignup({
              name,
              email: formData.email,
              password: formData.password,
              shopName: formData.shopName,
              address,
              services: formData.shopDescription ? [formData.shopDescription] : [],
              location, 
            });
          },
          (error) => {
            console.error(" Location Fetch Error:", error);
          }
        );
      }
    } catch (error) {
      console.error(" Signup Error:", error);
    }
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Branding */}
      <div className="hidden md:flex md:w-2/5 bg-primary p-8 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary-foreground">
          <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Sentinel</span>
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-primary-foreground">Join the printing revolution</h1>
          <p className="text-primary-foreground/80">
            Connect with local print shops or grow your printing business with our platform.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 shrink-0">
                <Upload className="h-5 w-5 text-primary-foreground" />
              </div>
              <p className="text-primary-foreground/80">
                "PrintConnect has transformed how I handle document printing. No more printer headaches!"
              </p>
            </div>
            <p className="text-primary-foreground font-medium">— Alex Morgan, Student</p>
          </div>
        </div>
        <div className="text-sm text-primary-foreground/70">© 2025 PrintConnect. All rights reserved.</div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 p-8 flex flex-col">
        <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}
              >
                1
              </div>
              <div className={`flex-1 h-1 mx-2 ${step === 2 ? "bg-primary" : "bg-primary/20"}`}></div>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}
              >
                2
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Basic Information</span>
              <span>{role === "customer" ? "Customer Details" : "Shop Details"}</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Social Login */}
          <div className="mb-8 space-y-4">
            <Button variant="outline" className="w-full" type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full" type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  fill="#1877F2"
                />
                <path
                  d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988C10.296 21.958 11.13 22 12 22c.87 0 1.703-.042 2.523-.112v-6.988h2.33z"
                  fill="white"
                />
              </svg>
              Continue with Facebook
            </Button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
            {step === 1 ? (
              /* Step 1: Basic Information */
              <div className="space-y-4">
                <div className="space-y-2 mb-6">
                  <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
                  <p className="text-muted-foreground">Enter your information to get started</p>
                </div>

                <Tabs defaultValue={role} onValueChange={setRole} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="customer">Customer</TabsTrigger>
                    <TabsTrigger value="shopkeeper">Shopkeeper</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      Password requirements?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              /* Step 2: Role-specific Information */
              <div className="space-y-4">
                <div className="flex items-center mb-6">
                  <Button variant="ghost" type="button" onClick={handlePrevStep} className="p-0 mr-2">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {role === "customer" ? "Customer Details" : "Shop Details"}
                  </h1>
                </div>

                {role === "customer" ? (
                  /* Customer Fields */
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            alt="Profile picture"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button variant="outline" type="button" size="sm">
                          Upload
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                ) : (
                  /* Shopkeeper Fields */
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="shopName">Shop Name</Label>
                      <Input
                        id="shopName"
                        name="shopName"
                        placeholder="Quick Print Services"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopAddress">Shop Address</Label>
                      <Input
                        id="shopAddress"
                        name="shopAddress"
                        placeholder="123 Main St"
                        value={formData.shopAddress}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shopCity">City</Label>
                        <Input
                          id="shopCity"
                          name="shopCity"
                          placeholder="New York"
                          value={formData.shopCity}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shopState">State</Label>
                        <Input
                          id="shopState"
                          name="shopState"
                          placeholder="NY"
                          value={formData.shopState}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shopZip">ZIP Code</Label>
                        <Input
                          id="shopZip"
                          name="shopZip"
                          placeholder="10001"
                          value={formData.shopZip}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopPhone">Contact Phone Number</Label>
                      <Input
                        id="shopPhone"
                        name="shopPhone"
                        type="tel"
                        placeholder="(123) 456-7890"
                        value={formData.shopPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="businessHours">Business Hours</Label>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        id="businessHours"
                        name="businessHours"
                        placeholder="Mon-Fri: 9AM-6PM, Sat: 10AM-4PM"
                        value={formData.businessHours}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shopDescription">Shop Description & Services</Label>
                      <Textarea
                        id="shopDescription"
                        name="shopDescription"
                        placeholder="Describe your shop and the services you offer..."
                        value={formData.shopDescription}
                        onChange={handleInputChange}
                        required
                        className="min-h-[100px]"
                      />
                    </div>
                  </>
                )}

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="termsAccepted"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="termsAccepted"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions
                    </label>
                    <p className="text-sm text-muted-foreground">
                      By creating an account, you agree to our{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={!formData.termsAccepted || isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

