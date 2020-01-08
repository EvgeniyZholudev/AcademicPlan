import {Component, OnInit} from '@angular/core';
import {Subject} from '../../entity/subject';
import {ExplanatoryNote} from '../../entity/explanatory-note';
import {ExplanatoryNoteService} from '../../service/explanatory-note.service';
import {Constants} from '../../const/constants';
import {Router} from '@angular/router';
import {SubjectService} from '../../service/subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  private subject: Subject = new Subject();
  private explanatoryNote: ExplanatoryNote = new ExplanatoryNote();
  constructor(private explanatoryNoteService: ExplanatoryNoteService, private router: Router, private subjectService: SubjectService) {}
  subjects: Subject[];

  ngOnInit() {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data;
    });
    this.explanatoryNoteService.get(parseInt(localStorage.getItem(Constants.EXPLANATORY_NOTE_IS_STRING))).subscribe(data => {
      this.explanatoryNote = data;
    })
  }

  private createSubject(){
    this.explanatoryNote.subject = this.subject;
    this.explanatoryNoteService.update(this.explanatoryNote).subscribe(data => {
      this.router.navigate([Constants.DEPARTMENT_ROUTE_PATH]);
    })
  }
}
