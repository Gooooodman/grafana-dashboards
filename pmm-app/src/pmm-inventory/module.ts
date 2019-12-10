import { MetricsPanelCtrl } from 'grafana/app/plugins/sdk';
import config from 'grafana/app/core/config';

export class PanelCtrl extends MetricsPanelCtrl {
  static template = `
		<iframe ng-src="{{ trustSrc(url) }}"
			style="width: 100%; height: 400px; border: 0;" scrolling="no" />
	`;

  baseUrl = '/qan/pmm-inventory';
  /** @ngInject */
  constructor($scope, $injector, templateSrv, $sce, $http) {
    super($scope, $injector);
    $scope.trustSrc = src => $sce.trustAsResourceUrl(src);
    $scope.qanParams = {
      theme: config.bootData.user.lightTheme ? 'light' : 'dark',
    };

    $scope.url = this.baseUrl + '?theme=' + $scope.qanParams.theme;
  }

  link($scope, elem) {
    const frame = elem.find('iframe');
    const panel = elem.find('div.panel-container');
    const panelContent = elem.find('div.panel-content');
    panel.css({
      'background-color': 'transparent',
      border: 'none',
    });

    $scope.ctrl.calculatePanelHeight = () => {
      const h =
        frame
          .contents()
          .find('body')
          .height() || 400;
      const documentH = elem && elem[0] ? elem[0].ownerDocument.height : h;

      $scope.ctrl.containerHeight = documentH;
      $scope.ctrl.height = documentH - 100;

      frame.height(`${h + 100}px`);
      panel.height(`${h + 150}px`);

      panelContent.height(`inherit`);
    };

    this.disableGrafanaPerfectScroll(elem);
    this.fixMenuVisibility(elem);

    frame.on('load', () => {
      $scope.ctrl.calculatePanelHeight();
      frame.contents().bind('DOMSubtreeModified', () => setTimeout(() => $scope.ctrl.calculatePanelHeight(), 10));
    });
  }

  /**
   * Workaround for scrolling through iframe
   * Grafana perfect scroll is broken for iframe and should be disabled for this case
   * @param elem - qan app panel HTML element
   * @returns {void, boolean}
   */
  private disableGrafanaPerfectScroll(elem): void | boolean {
    if (!elem || !elem[0]) {
      return false;
    }

    const perfectScrollContainers = elem[0].ownerDocument.getElementsByClassName('ps') as any;
    const rightScrollbarContainers = elem[0].ownerDocument.getElementsByClassName('ps__thumb-y') as any;

    [].forEach.call(perfectScrollContainers, (container: HTMLElement) => container.setAttribute('style', 'overflow: auto !important'));
    [].forEach.call(rightScrollbarContainers, (container: HTMLElement) => container.setAttribute('style', 'display: none !important'));
  }

  private fixMenuVisibility(elem): void | boolean {
    if (!elem || !elem[0]) {
      return false;
    }

    const menu = elem[0].ownerDocument.getElementsByClassName('dropdown-menu') as any;

    [].forEach.call(menu, (e: HTMLElement) => e.setAttribute('style', 'z-index: 1001'));
  }
}