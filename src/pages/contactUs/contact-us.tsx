import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "react-day-picker";
import Layout from "../../components/layout";
export default function Component() {
  return (
    <Layout>
      <Card className="w-full max-w-md mx-auto my-11">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
          <CardDescription>Join our mission to build a more sustainable future. Share your thoughts and connect with our team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Share your thoughts with us" className="min-h-[120px]" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter">Sign me up for the newsletter</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Send Message</Button>
        </CardFooter>
      </Card>
    </Layout>
  );
}
