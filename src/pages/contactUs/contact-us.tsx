import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DayPickerProvider, DayPickerProps } from "react-day-picker"; // Import DayPickerProvider and Calendar
import Layout from "../../components/layout";
import { Calendar } from "@/components/ui/calendar";

const initialDayPickerProps: DayPickerProps = {
  // Add the necessary props for the DayPicker component here
  mode: "range", // Example prop
  // Add other props as needed
};

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
              <label htmlFor="name">Name</label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone (optional)</label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message">Message</label>
              <Textarea id="message" placeholder="Share your thoughts with us" className="min-h-[120px]" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" />
              <label htmlFor="newsletter">Sign me up for the newsletter</label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Send Message</Button>
        </CardFooter>
      </Card>
      <DayPickerProvider initialProps={initialDayPickerProps}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start font-normal">
              <div className="mr-2 h-4 w-4 opacity-50" />
              Pilih Rentang Tanggal
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar /> {/* Removed mode="range" */}
          </PopoverContent>
        </Popover>
      </DayPickerProvider>
    </Layout>
  );
}
