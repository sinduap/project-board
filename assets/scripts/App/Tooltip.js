import { Component } from './Component.js';

export class Tooltip extends Component {
  constructor(closeNotifierFn, tooltipText, hostElementId) {
    super(hostElementId);
    this.tooltipText = tooltipText;
    this.closeNotifier = closeNotifierFn;
    this.create();
  }

  closeTooltip() {
    this.detach();
    this.closeNotifier();
  }

  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';

    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.tooltipText;
    tooltipElement.append(tooltipBody);

    const hostElPostLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPostLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = `${x}px`;
    tooltipElement.style.top = `${y}px`;

    tooltipElement.addEventListener('click', this.closeTooltip.bind(this));
    this.element = tooltipElement;
  }
}
