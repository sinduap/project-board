import { DOMHelper } from '../Utility/DOMHelper.js';

export class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectListsFn, type) {
    this.id = id;
    this.updateProjectListsHandler = updateProjectListsFn;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  connectMoreInfoButton() {
    const projectItemEl = document.getElementById(this.id);
    const moreInfoBtn = projectItemEl.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHandler.bind(this));
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectELement = document.getElementById(this.id);
    const tooltipText = projectELement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
  }

  connectSwitchButton(type) {
    const projectItemEl = document.getElementById(this.id);
    let switchBtn = projectItemEl.querySelector('button:last-of-type');
    switchBtn = DOMHelper.clearEventListeners(switchBtn);
    switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchBtn.addEventListener(
      'click',
      this.updateProjectListsHandler.bind(null, this.id)
    );
  }

  update(updateProjectListFn, type) {
    this.updateProjectListsHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}
