import { DayPickerProvider, DayPickerProps } from "react-day-picker";

import Layout from "@/components/layout";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const initialDayPickerProps: DayPickerProps = {
  mode: "range",
};

export default function Component() {
  return (
    <Layout>
      <Card className="w-full max-w-md mx-auto my-11" data-testid="contact-form-card">
        <CardHeader>
          <CardTitle data-testid="card-title">Get in Touch</CardTitle>
          <CardDescription data-testid="card-description">Join our mission to build a more sustainable future. Share your thoughts and connect with our team.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" data-testid="contact-form">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <Input id="name" placeholder="Enter your name" data-testid="input-name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="Enter your email" data-testid="input-email" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone (optional)</label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" data-testid="input-phone" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="message">Message</label>
              <Textarea id="message" placeholder="Share your thoughts with us" className="min-h-[120px]" data-testid="textarea-message" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="newsletter" data-testid="checkbox-newsletter" />
              <label htmlFor="newsletter">Sign me up for the newsletter</label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" data-testid="submit-button">
            Send Message
          </Button>
        </CardFooter>
      </Card>
      <DayPickerProvider initialProps={initialDayPickerProps}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start font-normal" data-testid="date-picker-trigger">
              <div className="mr-2 h-4 w-4 opacity-50" />
              Pilih Rentang Tanggal
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" data-testid="date-picker-popover">
            <Calendar data-testid="calendar" /> {/* Kalender */}
          </PopoverContent>
        </Popover>
      </DayPickerProvider>
    </Layout>
  );
}
