import { Component, OnInit } from '@angular/core';
import { PackService } from '../services/Pack/pack.service';
import { Pack } from '../models/pack.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-offre',
  imports: [CommonModule, FormsModule],
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  packs: Pack[] = [];
  filteredPacks: Pack[] = [];
  isModalOpen = false;
  newPack: Pack = { name: '', description: '', price: 0, durationMonths: 0, monthlyPrice: 0 };
  searchTerm: string = '';

  constructor(private packService: PackService) {}

  ngOnInit() {
    this.loadPacks();
  }

  loadPacks() {
    this.packService.getPacks().subscribe(packs => {
      this.packs = packs;
      this.filteredPacks = packs; // Initialize filteredPacks with all packs
    });
  }

  openModal(pack?: Pack) {
    if (pack) {
      this.newPack = { ...pack };
    } else {
      this.newPack = { name: '', description: '', price: 0, durationMonths: 0, monthlyPrice: 0 };
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSubmit() {
    if (this.newPack.id) {
      this.packService.updatePack(this.newPack.id, this.newPack).subscribe(updatedPack => {
        const index = this.packs.findIndex(p => p.id === this.newPack.id);
        if (index !== -1) {
          this.packs[index] = updatedPack;
          this.filteredPacks[index] = updatedPack; // Update filteredPacks as well
        }
        this.closeModal();
      });
    } else {
      this.packService.addPack(this.newPack).subscribe(pack => {
        this.packs.push(pack);
        this.filteredPacks.push(pack); // Add to filteredPacks as well
        this.closeModal();
      });
    }
  }

  editPack(pack: Pack) {
    this.openModal(pack);
  }

  deletePack(id: number) {
    this.packService.deletePack(id).subscribe(() => {
      this.packs = this.packs.filter(pack => pack.id !== id);
      this.filteredPacks = this.filteredPacks.filter(pack => pack.id !== id); // Update filteredPacks as well
    });
  }

  applyFilter() {
    this.filteredPacks = this.packs.filter(pack =>
      pack.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      pack.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
