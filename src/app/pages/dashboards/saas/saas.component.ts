import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import {
  UntypedFormBuilder,
  Validators,
  UntypedFormGroup,
  FormGroup,
} from "@angular/forms";

import { earningLineChart, salesAnalyticsDonutChart, ChatData } from "./data";
import { ChartType, ChatMessage } from "./saas.model";
import { ConfigService } from "../../../core/services/config.service";
import { UserProfileService } from "src/app/core/services/user.service";
import { CompteBancaire, User } from "src/app/core/models/auth.models";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-saas",
  templateUrl: "./saas.component.html",
  styleUrls: ["./saas.component.scss"],
})
/**
 * Saas-dashboard component
 */
export class SaasComponent implements OnInit, AfterViewInit {
  saveWallt() {
    console.log("azaze");

    this.newContactModal.show();
  }
  @ViewChild("scrollRef") scrollRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  earningLineChart: ChartType;
  salesAnalyticsDonutChart: ChartType;
  ChatData: ChatMessage[];

  sassEarning: any;
  sassTopSelling: any;

  formData: UntypedFormGroup;

  // Form submit
  chatSubmit: boolean;

  constructor(
    public formBuilder: UntypedFormBuilder,
    private configService: ConfigService,
    private userService: UserProfileService
  ) {}

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.createContactForm = this.formBuilder.group({
      id: [""],
      img: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      location: ["", [Validators.required]],
      description: ["", [Validators.required]],
      age: ["", [Validators.required]],
      profession: ["", [Validators.required]],
    });
    this.breadCrumbItems = [
      { label: "Dashboards" },
      { label: "Saas", active: true },
    ];

    this._fetchData();

    this.formData = this.formBuilder.group({
      message: ["", [Validators.required]],
    });

    this.configService.getConfig().subscribe((response) => {
      this.sassEarning = response.sassEarning;
      this.sassTopSelling = response.sassTopSelling;
    });

    this.loadAccBancaier();
  }

  compteBancaire: CompteBancaire;
  portefeuilles: any[];
  user: User;
  createContactForm: FormGroup;

  loadAccBancaier(): void {
    // Get the current user from local storage (assuming it's stored as JSON)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    // Extract email from currentUser
    const email = currentUser?.email;
    console.log(email);

    if (email) {
      // Call the service to get the user by email
      this.userService.getUserByEmail(email).subscribe((user: User) => {
        this.user = user;
        this.compteBancaire = user?.compteBancaire;
        this.portefeuilles = user?.compteBancaire?.portefeuilles;
        console.log(this.compteBancaire, "aaaaaaaaa");
      });
    }
  }
  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;
  savePortefeuilles() {
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
  messageSave() {
    const message = this.formData.get("message").value;
    const currentDate = new Date();
    if (this.formData.valid && message) {
      // Message Push in Chat
      this.ChatData.push({
        align: "right",
        name: "Henry Wells",
        message,
        time: currentDate.getHours() + ":" + currentDate.getMinutes(),
      });
      this.onListScroll();
      // Set Form Data Reset
      this.formData = this.formBuilder.group({
        message: null,
      });
    }

    this.chatSubmit = true;
  }

  private _fetchData() {
    this.earningLineChart = earningLineChart;
    this.salesAnalyticsDonutChart = salesAnalyticsDonutChart;
    this.ChatData = ChatData;
  }

  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 500;
  }

  onListScroll() {
    if (this.scrollRef !== undefined) {
      setTimeout(() => {
        this.scrollRef.SimpleBar.getScrollElement().scrollTop =
          this.scrollRef.SimpleBar.getScrollElement().scrollHeight + 1500;
      }, 500);
    }
  }

  selectMonth(value) {
    let data = value.target.value;
    switch (data) {
      case "january":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 35, 20, 41, 51, 42, 49, 45, 58, 42, 75, 48],
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2007.35",
            revenue: "0.2",
            time: "From previous period",
            month: "Last month",
            previousamount: "$784.04",
            series: [
              {
                name: "series1",
                data: [22, 28, 31, 34, 40, 52, 29, 45, 68, 60, 47, 12],
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2887.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$684.04",
            series: [
              {
                name: "series1",
                data: [28, 30, 48, 50, 47, 40, 35, 48, 56, 42, 65, 41],
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassEarning = [
          {
            name: "This month",
            amount: "$2100.35",
            revenue: "0.4",
            time: "From previous period",
            month: "Last month",
            previousamount: "$674.04",
            series: [
              {
                name: "series1",
                data: [28, 48, 39, 47, 48, 41, 28, 46, 25, 32, 24, 28],
              },
            ],
          },
        ];
        break;
    }
  }

  sellingProduct(event) {
    let month = event.target.value;
    switch (month) {
      case "january":
        this.sassTopSelling = [
          {
            title: "Product B",
            amount: "$ 7842",
            revenue: "0.4",
            list: [
              {
                name: "Product D",
                text: "Neque quis est",
                sales: 41,
                chartVariant: "#34c38f",
              },
              {
                name: "Product E",
                text: "Quis autem iure",
                sales: 14,
                chartVariant: "#556ee6",
              },
              {
                name: "Product F",
                text: "Sed aliquam mauris.",
                sales: 85,
                chartVariant: "#f46a6a",
              },
            ],
          },
        ];
        break;
      case "december":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6",
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#f46a6a",
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f",
              },
            ],
          },
        ];
        break;
      case "november":
        this.sassTopSelling = [
          {
            title: "Product C",
            amount: "$ 4745",
            revenue: "0.8",
            list: [
              {
                name: "Product G",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#34c38f",
              },
              {
                name: "Product H",
                text: "Quis autem iure",
                sales: 42,
                chartVariant: "#556ee6",
              },
              {
                name: "Product I",
                text: "Sed aliquam mauris.",
                sales: 63,
                chartVariant: "#f46a6a",
              },
            ],
          },
        ];
        break;
      case "october":
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#f46a6a",
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#556ee6",
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#34c38f",
              },
            ],
          },
        ];
        break;
      default:
        this.sassTopSelling = [
          {
            title: "Product A",
            amount: "$ 6385",
            revenue: "0.6",
            list: [
              {
                name: "Product A",
                text: "Neque quis est",
                sales: 37,
                chartVariant: "#556ee6",
              },
              {
                name: "Product B",
                text: "Quis autem iure",
                sales: 72,
                chartVariant: "#34c38f",
              },
              {
                name: "Product C",
                text: "Sed aliquam mauris.",
                sales: 54,
                chartVariant: "#f46a6a",
              },
            ],
          },
        ];
        break;
    }
  }
}
