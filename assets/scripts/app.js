import { ProjectList } from './App/ProjectList.js';

class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishedProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandlerFn(
      finishedProjectList.addProject.bind(finishedProjectList)
    );
    finishedProjectList.setSwitchHandlerFn(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}

App.init();
