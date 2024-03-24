
![uml_diyagram](https://github.com/omerfaruksen/VetApp/assets/109878350/e5626fb6-a7ab-4ea0-97ce-b910899e1b9c)

https://vet-app-six.vercel.app/
Aşağıdaki isterleri karşılayan projedir
veteriner doktorların kaydedilmesi,

doktorların çalışma günlerinin (müsait günlerini) kaydedilmesi,

müşterilerin kaydedilmesi,

müşterilere ait hayvanların kaydedilmesi,

hayvanlar için veteriner hekimlere randevu oluşturulması,

randevu oluştururken tarih ve saat girilmesi,

hayvanlara uygulanmış aşıların tarihleriyle birlikte kaydedilmesi,
randevuya ait rapor düzenleyebilmeli,

daha sonra da bu rapora ait aşı kaydı yapmalıdır. Aşı kaydında ayrıca hayvan bilgisi de olmalıdır.
Katmanlı mimari kullanılmalıdır.

IoC, DI için constructor injection kullanılmalıdır.

Gerekli anotasyonlar (@Entity, @Table, @Id, @OneToMany, @ManyToOne, @ManyToMany vs.) yazılmalıdır.

Tüm yeni veri kaydetme işlemlerinde zaten var olan bir verinin kaydedilmediği kontrol edilmelidir.

Exception kullanılmalıdır. Örneğin id parametresi alınarak yapılan update,delete işlemlerinde silme isteği atmadan veri tabanında girilen id ile ilgili kayıt var mı diye kontrol edilmelidir. Eğer ki kayıt yok ise “throw new RuntimeException(id + " id’li kayıt sistemde bulunamadı.");” gibi hata mesajı fırlatılmalıdır. Eğer kayıt varsa silme işlemi yapılmalıdır.

Projede belirtilen entity (varlık) sınıflarını ve bunların arasındaki ilişkiler belirlenmelidir.

Gerekli anotasyonları (@Entity, @Table, @Id, @OneToMany, @ManyToOne, @ManyToMany) yazın.

Gerekli Fetch ve Cascade anotasyonlarını yazın.

HTTP durum kodları doğru ve anlamlı olmalıdır.

Sistemde alınabilecek hatalarda API kullanıcısına anlamlı çıktılar verilmeli ve hatalar yönetilmelidir.

Request ve Response DTO’lar kullanabilirsin.

API end pointlerini anlatan bir doküman hazırlanmalıdır.

Bir veri sildikten sonra veri tabanında anlamsız veri kalmamalıdır. Örneğin : Sistemde bir Customer silindiği zaman, o Customer’a ait hayvanlar ve o hayvanlara ait bilgilerinde sistemden silinmesi gereklidir.

PostgreSQL ve MySQL veri tabanı kullanabilirsin.

Spring Web, Spring Data Jpa, PostgreSQL, MySQL dependencyleri eklenmelidir.
