import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { VaccinationService } from "../../../services/vaccination.service";
import { getUserNIC } from "../../../utils/user.util";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "vaccinations",
  templateUrl: "./vaccinations.component.html",
  styleUrls: ["./vaccinations.component.scss"],
})
export class VaccinationsComponent implements OnInit {
  @Input() profile;
  @ViewChild("sideEffectsModal") public sideEffectsModal: ModalDirective;

  vaccinationData = [];
  sideEffectsList = [
    "Headache",
    "Fever",
    "Tiredness",
    "Muscle Pain",
    "Chills",
    "Nausea",
  ];
  selectedVaccine = null;
  updatingVaccine = false;

  constructor(
    private vaccinationService: VaccinationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getVaccination();
  }

  // get vaccination data
  getVaccination = () => {
    this.vaccinationService.getVaccinationByNIC(getUserNIC()).subscribe(
      (res) => {
        if (res) {
          this.vaccinationData = (res.result || []).sort((a, b) => {
            return (
              new Date(a.dateOfVaccination).getDate() -
              new Date(b.dateOfVaccination).getDate()
            );
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getFormattedDate = (date) => {
    return new Date(date).toISOString().split("T")[0];
  };

  getNextVaccinationDate = () => {
    if (this.vaccinationData?.length > 0) {
      const lastVaccinationDate = new Date(
        this.vaccinationData[this.vaccinationData.length - 1].dateOfVaccination
      );
      return new Date(
        lastVaccinationDate.setMonth(lastVaccinationDate.getMonth() + 3)
      )
        .toISOString()
        .split("T")[0];
    }
    return "";
  };

  addSideEffectsModal = (vaccine) => {
    this.sideEffectsList = [...this.sideEffectsList];
    this.selectedVaccine = JSON.parse(JSON.stringify(vaccine));
    this.sideEffectsModal.show();
  };

  onSideEffectChange = (se) => {
    if (this.selectedVaccine?.sideEffects.some(a=>a.detail == se)) {
      const removeIndex = this.selectedVaccine?.sideEffects.findIndex(
        (a) => a.detail == se
      );
      this.selectedVaccine?.sideEffects.splice(removeIndex, 1);
      return;
    }
    this.selectedVaccine?.sideEffects.push({detail : se});
  };

  closeSideEffectModal = () => {
    this.selectedVaccine = null;
    this.sideEffectsModal.hide();
  };

  updateVaccine = () => {
    this.updatingVaccine = true;
    this.selectedVaccine.sideEffects.forEach(sideE => {
      this.vaccinationService
      .createVaccineSideEffect(this.selectedVaccine.id, sideE)
      .subscribe(
        (res) => {
        },
        (error) => {
          this.updatingVaccine = false;
          console.log(error);
          // this.toastr.error("Something went wrong!", "Error");
        }
      );
    });

    setTimeout(() => {
      const updatedVaccine = this.vaccinationData.find(
        (a) => a.id == this.selectedVaccine.id
      );
      updatedVaccine.sideEffects = this.selectedVaccine.sideEffects;
      this.toastr.success("Vaccination Updated!", "Success");
      this.updatingVaccine = false;
      this.closeSideEffectModal();
    }, 2000);

  };
}
