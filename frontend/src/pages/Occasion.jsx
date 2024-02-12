import { useContext, useEffect, useState } from "react";

import AuthContext from "@/contexts/authContext/AuthContext";

import MemorableMessagesApi from "@/apis/memorableMessages/memorableMessagesApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

const Occasion = () => {
  const { handleLogout } = useContext(AuthContext);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [occasions, setOccasions] = useState([]);

  const showToast = (title, description, variant = "default") =>
    toast({
      variant,
      title,
      description,
    });

  useEffect(() => {
    document.title = "Memorable Messages | Occasions";

    const getUserOccasions = async () => {
      setIsLoading(true);
      try {
        const resp = await MemorableMessagesApi.getUserOccasions();
        setOccasions(resp);
        setIsLoading(false);
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

    getUserOccasions();
  }, []);

  return (
    <div className="occasions h-1/2">
      <Table>
        <TableCaption>A list of occasions that you created.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Occasion Type</TableHead>
            <TableHead>Receiver Email</TableHead>
            <TableHead>Receiver Phone</TableHead>
            <TableHead>Delivery Method</TableHead>
            <TableHead>Delivery Date and Time</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            occasions.map(
              ({
                id,
                occasion_type,
                receiver_email,
                receiver_phone,
                delivery_method,
                date_time,
                created_at,
              }) => (
                <TableRow key={id}>
                  <TableCell>{occasion_type}</TableCell>
                  <TableCell>{receiver_email}</TableCell>
                  <TableCell>{receiver_phone}</TableCell>
                  <TableCell>{delivery_method}</TableCell>
                  <TableCell>{date_time}</TableCell>
                  <TableCell>{created_at}</TableCell>
                </TableRow>
              ),
            )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell>{!isLoading && occasions.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Occasion;
