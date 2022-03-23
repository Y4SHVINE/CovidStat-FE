import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { VaccinationService } from "../../services/vaccination.service";
import { getUserLocation } from "../../utils/user.util";

@Component({
  selector: "app-vaccination",
  templateUrl: "./vaccination.component.html",
  styleUrls: ["./vaccination.component.scss"],
})
export class VaccinationComponent implements OnInit {
  vaccinationForm: FormGroup;
  nicSearchForm: FormGroup;
  isFormVisible = false;
  savingVaccinationData = false;
  maxDate = new Date().toISOString().split("T")[0];

  constructor(
    private toastr: ToastrService,
    private vaccinationService: VaccinationService
  ) {}

  ngOnInit(): void {
    this.nicSearchForm = new FormGroup({
      nicSearchText: new FormControl("", [
        Validators.required,
        Validators.pattern(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/),
      ]),
    });

    this.vaccinationForm = new FormGroup({
      nic: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required]),
      vaccine: new FormControl("", [Validators.required]),
      dateOfVaccination: new FormControl(
        new Date().toISOString().split("T")[0],
        [Validators.required]
      ),
      batchNumber: new FormControl("", [Validators.required]),
      remarks: new FormControl(""),
    });
  }

  onNicSelect = () => {
    if (this.nicSearchForm.valid) {
      this.isFormVisible = true;
      this.nicSearchForm.get("nicSearchText").disable();
      return;
    }
    this.toastr.warning("Invalid NIC!", "Warning");
  };

  cancelSelection = () => {
    this.savingVaccinationData = false;
    this.isFormVisible = false;
    this.nicSearchForm.get("nicSearchText").enable();
  };

  onSubmit = () => {
    this.savingVaccinationData = true;
    this.vaccinationForm
      .get("nic")
      .setValue(this.nicSearchForm.get("nicSearchText").value);
    this.vaccinationForm.get("location").setValue(getUserLocation());
    if (this.vaccinationForm.valid) {
      this.vaccinationService
        .createVaccination(this.vaccinationForm.value)
        .subscribe(
          (res) => {
            if (res) {
              this.cancelSelection();
              this.vaccinationForm.reset();
              this.nicSearchForm.reset();
              this.toastr.success('Vaccination data added successfully', 'Success');
            }
          },
          (error) => {
            this.savingVaccinationData = false;
            console.log(error);
          }
        );
    }
  };
}
