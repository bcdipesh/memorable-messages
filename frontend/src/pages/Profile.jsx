import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AuthContext from "@/contexts/authContext/AuthContext";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

/**
 * Profile component renders form managing user account details and password.
 *
 * @returns {React.JSX.Element} Profile component UI.
 */
const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { handleLogout } = useContext(AuthContext);

  // Form setup for user details
  const userDetailsForm = useForm({
    resolver: yupResolver(
      yup.object({
        username: yup.string().required(),
        email: yup.string().required(),
      }),
    ),
    defaultValues: {
      username: "",
      email: "",
    },
    values: {
      username,
      email,
    },
  });

  // Form setup for user password
  const userPasswordForm = useForm({
    resolver: yupResolver(
      yup.object({
        currentPassword: yup.string().required(),
        newPassword: yup.string().required(),
      }),
    ),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  /**
   * Display a toast notification with optional variant
   * @param title - Title of the notification
   * @param description - Description of the notification
   * @param variant - Optional variant (default, success, destructive)
   */
  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  useEffect(() => {
    // Set document title
    document.title = "Memorable Messages | Profile";

    /**
     * Fetch user details and update state variables.
     */
    const getUserDetails = async () => {
      setIsLoading(true);
      try {
        const resp = await MemorableMessagesApi.getCurrentUserDetails();
        setIsLoading(false);
        setUsername(resp.username);
        setEmail(resp.email);
      } catch (err) {
        setIsLoading(false);
        if (err.statusCode === 401) {
          handleLogout();
          showToast(
            "Oops! It seems your session has expired.",
            "Please log back in using your username and password and try again.",
            "destructive",
          );
        }
      }
    };

    getUserDetails();
  }, []);

  /**
   * Handle form submission for updating user details.
   * @param {object} data - Form data.
   * @param {Event} e - Form submission event.
   */
  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const resp = await MemorableMessagesApi.updateUserDetails(data);
      setUsername(resp.username);
      setEmail(resp.email);
    } catch (err) {
      if (err.statusCode === 400) {
        showToast(
          "Uh oh! Something went wrong.",
          "We couldn't process your request. Please double-check your information and try again.",
          "destructive",
        );
      } else if (err.statusCode === 401) {
        handleLogout();
        showToast(
          "Oops! It seems your session has expired.",
          "Please log back in using your username and password and try again.",
          "destructive",
        );
      }
    }
  };

  /**
   * Handle form submission for updating user password.
   * @param {object} data - Form data.
   * @param {Event} e - Form submission event.
   */
  const updatePassowrd = async (data, e) => {
    e.preventDefault();
    try {
      // Log in with the current password
      await MemorableMessagesApi.login(username, data.currentPassword);

      // Update user details with the new password
      await MemorableMessagesApi.updateUserDetails({
        username,
        email,
        password: data.newPassword,
      });
      showToast(
        "Password updated!",
        "Your password has been successfully changed. Remember to keep it safe!",
      );

      // Log out after updating the password
      handleLogout();
    } catch (err) {
      if (err.statusCode === 400) {
        showToast(
          "Uh oh! Something went wrong.",
          "We couldn't process your request. Please double-check your information and try again.",
          "destructive",
        );
      } else if (err.statusCode === 401) {
        showToast(
          "Uh oh! Something went wrong.",
          "The password you entered doesn't match your current password. Please try again.",
          "destructive",
        );
      }
    }
  };

  return (
    <Tabs defaultValue="account" className="h-1/2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      {/* User details */}
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="user-details-loading-skeleton flex flex-col space-y-4">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />

                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}{" "}
            {!isLoading && (
              <Form {...userDetailsForm}>
                <form
                  id="userDetailsForm"
                  onSubmit={userDetailsForm.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={userDetailsForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userDetailsForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="name@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter>
            <Button form="userDetailsForm" type="submit">
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Update password */}
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Form {...userPasswordForm}>
              <form
                id="userPasswordForm"
                onSubmit={userPasswordForm.handleSubmit(updatePassowrd)}
                className="space-y-4"
              >
                <FormField
                  control={userPasswordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={userPasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button type="submit" form="userPasswordForm">
              Update password
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default Profile;
