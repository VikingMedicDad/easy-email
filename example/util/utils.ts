import qRCode from 'qrcode-generator';
import _ from 'lodash';

export function isPC() {
  return !isIOS() && !isAndroid();
}

export function isIOS() {
  return /(iPhone|iPod|ios)/i.test(navigator.userAgent);
}

export function isAndroid() {
  return (
    navigator.userAgent.indexOf('Android') > -1 ||
    navigator.userAgent.indexOf('Adr') > -1
  );
}

export function getCookie(key: string) {
  let value = '';
  document.cookie.split(';').forEach((item) => {
    const name = item.split('=')[0];
    if (name.trim() === key) {
      value = item.replace(`${name}=`, '');
    }
  });
  return value;
}

/**
 * 判断是不是数字，或者字符串数字
 * @param num
 */
export function isNumber(num: any): num is number {
  if (typeof num !== 'string' && typeof num !== 'number') return false;
  return new RegExp('^(\\-|\\+)?\\d+(\\.\\d+)?$').test(num.toString());
}

export function previewLoadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
  });
}

export async function getImageFile(url: string) {
  const pic = await previewLoadImage(url);
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;
  canvas.style.width = '0px';
  canvas.style.height = '0px';
  ctx.drawImage(pic, 0, 0);
  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((blob) => resolve(blob!))
  );
  canvas.parentNode!.removeChild(canvas);
  return blob;
}

export function previewLoadImageList(
  list: string[]
): Promise<HTMLImageElement[]> {
  return Promise.all(
    list.map((item) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = item;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    })
  );
}

export function randomRange(min: number, max: number, isInt = true) {
  if (isInt) {
    return parseInt((Math.random() * (max - min + 1) + min).toString(), 10);
  }
  return Math.random() * (max - min + 1) + min;
}

export const isMouseEvent = (
  event: MouseEvent | TouchEvent
): event is MouseEvent => !!(event.type.indexOf('mouse') !== -1);

export const isReactMouseEvent = (
  event: React.TouchEvent | React.MouseEvent
): event is React.MouseEvent => !!(event.type.indexOf('mouse') !== -1);

export const isElement = (
  event: HTMLElement | ChildNode
): event is HTMLElement => !!(event as HTMLElement).tagName;

export type FilterType<T, K> = {
  [P in keyof T]: T[P] extends K ? P : never;
}[keyof T];

export async function createQrcode(url: string, logo?: string) {
  try {
    const canvasWidth = 500;
    const logoWidth = canvasWidth / 4;
    const padding = 10;
    const canvas = document.createElement('canvas');
    canvas.style.height = '0px';
    canvas.style.width = '0px';
    canvas.width = canvasWidth;
    canvas.style.visibility = 'hidden';
    canvas.height = canvasWidth;

    document.body.appendChild(canvas);
    const qr = qRCode(0, 'H');
    qr.addData(url);
    qr.make();
    const qrcodeUrl = qr.createDataURL(5);

    if (!logo) {
      return qrcodeUrl;
    }

    const qrcodeImage = await previewLoadImage(qrcodeUrl);
    const logoImage = await previewLoadImage(logo);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(qrcodeImage, 0, 0, canvasWidth, canvasWidth);
    ctx.fillStyle = 'white';
    ctx.fillRect(
      (canvasWidth - logoWidth) / 2 - padding,
      (canvasWidth - logoWidth) / 2 - padding,
      logoWidth + 2 * padding,
      logoWidth + 2 * padding
    );
    ctx.drawImage(
      logoImage,
      (canvasWidth - logoWidth) / 2,
      (canvasWidth - logoWidth) / 2,
      logoWidth,
      logoWidth
    );
    ctx.save();
    const logoQrCode = canvas.toDataURL('png');
    document.body.removeChild(canvas);
    return logoQrCode;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export function getPublishPath() {
  return window.location.origin + '/';
}
