
  export class CharacterService{
    static  TurkishCharacterFix(metin: string): string {
        return metin.replace(/ğ/g, 'g')
                    .replace(/Ğ/g, 'G')
                    .replace(/ı/g, 'i')
                    .replace(/İ/g, 'I')
                    .replace(/ş/g, 's')
                    .replace(/Ş/g, 'S')
                    .replace(/ç/g, 'c')
                    .replace(/Ç/g, 'C')
                    .replace(/ü/g, 'u')
                    .replace(/Ü/g, 'U')
                    .replace(/ö/g, 'o')
                    .replace(/Ö/g, 'O')
                    .replace(/â/g, 'a')
                    .replace(/Â/g, 'A')
                    .replace(' ','_');
      }
      
  }