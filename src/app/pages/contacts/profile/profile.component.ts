import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { User } from "src/app/core/models/auth.models";
import { UserProfileService } from "src/app/core/services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  createContactForm: FormGroup;
  submitted = false;
  imageURL: string | undefined;
  revenueBarChart: any;
  statData: any;
  user: User | undefined;

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;

  // Inject FormBuilder into the constructor
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserProfileService
  ) {}

  ngOnInit() {
    // Initialize breadcrumb items
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    // Initialize the form group using formBuilder
    this.createContactForm = this.formBuilder.group({
      id: [""],
      img: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      location: ["", [Validators.required]],
      description: ["", [Validators.required]],
      age: ["", [Validators.required]],
      profession: ["", [Validators.required]],
    });

    // Fetches data for charts or statistics
    this._fetchData();

    this.loadUserProfile();
  }

  // Fetches the data (mock data in this example)
  private _fetchData() {
    // Assuming revenueBarChart and statData are available elsewhere
    this.revenueBarChart = {}; // Replace with actual data
    this.statData = {}; // Replace with actual data
  }

  // Save user data from the form
  saveUser() {
    this.submitted = true;

    // Check if the form is valid before proceeding
    if (this.createContactForm.valid) {
      console.log("Form Values:", this.createContactForm.value);
      // Handle form submission logic here (e.g., saving data)

      // Reset form and close modal after saving
      this.createContactForm.reset();
      this.newContactModal?.hide();
    } else {
      console.log("Form is invalid");
    }
  }
  editProfile() {
    this.newContactModal.show();
  }
  // Handle file change for user profile image
  fileChange(event: any) {
    const fileList: any = event.target as HTMLInputElement;
    const file: File = fileList.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.createContactForm.controls["img"].setValue(this.imageURL);
    };

    reader.readAsDataURL(file);
  }

  // Save profile logic
  saveProfile(): void {
    this.submitted = true;

    // Extract the form values
    const userData = {
      phone: this.createContactForm.get("phone")?.value,
      location: this.createContactForm.get("location")?.value,
      description: this.createContactForm.get("description")?.value,
      age: this.createContactForm.get("age")?.value,
      profession: this.createContactForm.get("profession")?.value,
    };

    // Get the user's email from local storage
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = currentUser?.email;

    if (email) {
      // Call the service to update the user profile by email
      this.userService.updateUserByEmail(email, userData).subscribe(
        (response) => {
          console.log("Profile updated successfully:", response);
          this.loadUserProfile();

          // Optionally, close the modal after success
          this.newContactModal?.hide();
        },
        (error) => {
          console.error("Error updating profile:", error);
        }
      );
    } else {
      console.error("No email found in local storage.");
    }
  }

  loadUserProfile(): void {
    // Get the current user from local storage (assuming it's stored as JSON)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    // Extract email from currentUser
    const email = currentUser?.email;

    if (email) {
      // Call the service to get the user by email
      this.userService.getUserByEmail(email).subscribe(
        (user: User) => {
          this.user = user;
          // Populate form fields with the user's data
          this.createContactForm.patchValue({
            phone: user.phone,
            location: user.location,
            description: user.description,
            age: user.age,
            profession: user.profession,
          });
        },
        (error) => {
          console.error("Error fetching user by email:", error);
        }
      );
    } else {
      console.error("No email found in local storage.");
    }
  }
}
