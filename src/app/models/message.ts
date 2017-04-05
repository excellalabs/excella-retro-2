export class Message {
  text: string;
  groupId: string;
  phaseId: string;
  retroId: string;
  $key: string;

  constructor(text: string, groupId: string, phaseId: string, retroId: string) {
    this.text = text;
    this.groupId = groupId;
    this.phaseId = phaseId;
    this.retroId = retroId;
  }
}
