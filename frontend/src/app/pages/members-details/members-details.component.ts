import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members-details',
  imports: [],
  templateUrl: './members-details.component.html',
  styleUrl: './members-details.component.scss'
})
export class MembersDetailsComponent {
  route = inject(ActivatedRoute);
  memberId: string | null = this.route.snapshot.paramMap.get('id');
}
