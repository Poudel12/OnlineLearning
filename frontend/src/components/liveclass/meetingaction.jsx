import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Copy, Link2, LinkIcon, Plus, Video } from "lucide-react";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "../ui/dialog";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MeetingAction() {
  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("");
  const navigate = useNavigate();

  // Set base URL when component mounts
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Function to create a meeting link
  const handleCreateMeetingForLater = () => {
    const roomId = uuidv4();
    const url = `${baseUrl}/video-meeting/${roomId}`;
    setGeneratedMeetingUrl(url);
    setIsDialogOpen(true);
    toast.success("Meeting link created successfully");
  };

  // Function to copy meeting link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMeetingUrl);
    toast.info("Meeting link copied to clipboard");
  };

  // Reset focus when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      document.activeElement.blur();
    }
  }, [isDialogOpen]);

  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Meeting Actions */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full sm:w-auto" size="lg">
              <Video className="w-5 h-5 mr-2" />
              New meeting
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleCreateMeetingForLater}>
              <Link2 className="w-4 h-4 mr-2" />
              Create a meeting for later
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Plus className="w-4 h-4 mr-2" />
              Start an instant meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Input field for joining a meeting */}
        <div className="flex w-full sm:w-auto relative">
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <LinkIcon className="w-4 h-4 text-gray-400" />
          </span>
          <Input
            placeholder="Enter a code or link"
            className="pl-8 rounded-r-none pr-10"
          />
          <Button variant="secondary" className="rounded-l-none">
            Join
          </Button>
        </div>
      </div>

      {/* Meeting Link Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-sm rounded-lg p-6"
          aria-describedby="meeting-link-description"
        >
          <DialogHeader>
            <DialogTitle className="text-3xl font-normal">
              Link For Joining
            </DialogTitle>
            <DialogDescription id="meeting-link-description">
              Share this link with participants to join the meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Infinite Learn is an online platform offering interactive courses,
              personalized learning, live classes, and mentorship for students
              worldwide.
            </p>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 break-all">
                {generatedMeetingUrl.slice(0, 30)}...
              </span>
              <Button
                variant="ghost"
                className="hover:bg-gray-200"
                onClick={copyToClipboard}
              >
                <Copy className="w-5 h-5 text-orange-500" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MeetingAction;
 