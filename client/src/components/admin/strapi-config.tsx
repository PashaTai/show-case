import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema for configuration form
const configSchema = z.object({
  strapiUrl: z.string().url({ message: "Please enter a valid URL" }),
  apiToken: z.string().min(1, { message: "API token is required" }),
});

type StrapiConfigFormValues = z.infer<typeof configSchema>;

export default function StrapiConfig() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get saved config values from localStorage if available
  const savedConfig = localStorage.getItem('strapiConfig');
  const defaultValues = savedConfig 
    ? JSON.parse(savedConfig) 
    : { strapiUrl: 'http://localhost:1337', apiToken: '' };
  
  // Initialize form with default values
  const form = useForm<StrapiConfigFormValues>({
    resolver: zodResolver(configSchema),
    defaultValues,
  });
  
  // Test the connection to Strapi
  const testConnection = async (values: StrapiConfigFormValues) => {
    setIsLoading(true);
    
    try {
      const response = await axios.get(`${values.strapiUrl}/api/articles?pagination[limit]=1`, {
        headers: {
          Authorization: `Bearer ${values.apiToken}`,
        },
      });
      
      toast({
        title: "Connection Successful",
        description: "Successfully connected to Strapi CMS",
      });
      
      // Save configuration in localStorage
      localStorage.setItem('strapiConfig', JSON.stringify(values));
      
      // Set values to environment
      if (import.meta.env) {
        (window as any).VITE_STRAPI_URL = values.strapiUrl;
        (window as any).VITE_STRAPI_API_TOKEN = values.apiToken;
      }
      
      return response.data;
    } catch (error) {
      console.error("Failed to connect to Strapi:", error);
      
      toast({
        title: "Connection Failed",
        description: "Could not connect to Strapi. Please check URL and API token.",
        variant: "destructive",
      });
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Form submission handler
  const onSubmit = async (values: StrapiConfigFormValues) => {
    await testConnection(values);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Strapi CMS Configuration</CardTitle>
        <CardDescription>
          Connect your blog to a Strapi CMS instance
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="strapiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strapi URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-strapi-cms.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The URL of your Strapi CMS instance
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="apiToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Token</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Your Strapi API token" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create an API token in Strapi: Settings &gt; API Tokens
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Testing Connection..." : "Save & Test Connection"}
            </Button>
          </form>
        </Form>
      </CardContent>
      
      <CardFooter className="flex flex-col text-sm text-slate-500">
        <p>
          Note: Configuration is stored in your browser's local storage.
        </p>
      </CardFooter>
    </Card>
  );
}