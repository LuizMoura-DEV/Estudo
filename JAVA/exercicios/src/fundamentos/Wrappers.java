package fundamentos;

public class Wrappers {

	public static void main(String[] args) {

		Byte b = 100; 			// byte
		Short s = 1000; 		// short
//		Integer i = Integer.parseInt(entrada.next());	// int
		Integer i = 10000;
		Long l = 100000L; 		// long

		System.out.println(b.byteValue());
		System.out.println(s.toString());
		System.out.println(i * 3);
		System.out.println(l / 3);
		
		Float f = 123.10F; 		//floar
		System.out.println(f);
		Double d = 1234.5678;	//double
		System.out.println(d);
		
		Boolean bo = Boolean.parseBoolean("true");
		System.out.println(bo);	//boolea
		System.out.println(bo.toString().toUpperCase());
		
		Character c = '#';		//char
		System.out.println(c + "...");		

	}
}
